using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Contexts;
using api.Dtos.AccountDtos;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : Controller
    {
        DatabaseContext _context;
        UserManager<DocUser> _userManager;
        SignInManager<DocUser> _signInManager;
        public UserController(DatabaseContext context, UserManager<DocUser> userManager, SignInManager<DocUser> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterUserDto registerUserDto)
        {
            // Checks if email already exists
            bool emailAlreadyExists = await _userManager.FindByEmailAsync(registerUserDto.Email) != null;
            bool usernameAlreadyExists = await _userManager.FindByNameAsync(registerUserDto.UserName) != null;
            if (emailAlreadyExists) return Unauthorized("Email already exists");
            if (usernameAlreadyExists) return Unauthorized("Username already exists");

            DocUser newUser = new DocUser { UserName = registerUserDto.UserName, Email = registerUserDto.Email };
            var createdUser = await _userManager.CreateAsync(newUser, registerUserDto.Password);
            if (createdUser.Succeeded) return Ok();
            return BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(LoginUserDto loginUserDto)
        {
            DocUser? user = await _userManager.FindByEmailAsync(loginUserDto.Email);
            if (user == null) return Unauthorized("Invalid Username or Password");

            var result = await _signInManager.PasswordSignInAsync(user, loginUserDto.Password, false, false);

            if (!result.Succeeded) return Unauthorized("Invalid Username or Password");

            UserInfoDto userInfo = new UserInfoDto { UserId = user.Id, Email = user.Email, UserName = user.UserName, PhoneNumber = user.PhoneNumber, EmailConfirmed = user.EmailConfirmed };
            return Ok(userInfo);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> LogoutUser()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [Authorize]
        [HttpGet("getUserInfo")]
        public async Task<IActionResult> GetUserInfo()
        {
            string? userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null) return BadRequest();

            DocUser? user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null) return BadRequest();

            string? userId = user.Id;
            string? userName = user.UserName;
            string? phoneNumber = user.PhoneNumber;
            bool emailConfirmed = user.EmailConfirmed;
            return Ok(new UserInfoDto { UserId = userId, UserName = userName, Email = userEmail, PhoneNumber = phoneNumber, EmailConfirmed = emailConfirmed });
        }
    }
}