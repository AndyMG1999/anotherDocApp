using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Contexts;
using api.Dtos.DocDtos;
using api.Hubs;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/doc")]
    public class DocumentController : Controller
    {
        private readonly DatabaseContext _context;
        private readonly UserManager<DocUser> _userManager;
        private readonly IHubContext<DocHub> _docHubContext;
        public DocumentController(DatabaseContext context, IHubContext<DocHub> docHubContext, UserManager<DocUser> userManager)
        {
            _context = context;
            _userManager = userManager;
            _docHubContext = docHubContext;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            List<GetDocDto> getDocDtos = [];
            List<Document> documents = await _context.Documents.Include(doc => doc.OwnedBy).ToListAsync();
            foreach(Document doc in documents)
            {
                DocOwnerDto docOwnerDto = new DocOwnerDto { UserId = doc.OwnedBy?.Id, UserName = doc.OwnedBy?.UserName, EmailConfirmed = doc.OwnedBy?.EmailConfirmed ?? false, ProfileImage = doc.OwnedBy?.ProfileImage };
                getDocDtos.Add(new GetDocDto { Id = doc.Id, Name = doc.Name, Content = doc.Content, OwnedBy = docOwnerDto, DateCreated = doc.DateCreated, LastEdit = doc.LastEdit });
            }
            return Ok(getDocDtos);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            Document document = await _context.Documents.FindAsync(id) ?? throw new Exception("Document Not Found");
            return Ok(document);
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateDocDto createDocDto)
        {
            DocUser testUser = new DocUser { Email = "dummyEmail@email.com", UserName = "dummyUser" };
            Document newDoc = new Document { Id = new Guid(), Name = createDocDto.Name, Content = createDocDto.Content, DateCreated = DateTime.UtcNow, LastEdit = DateTime.UtcNow, OwnedBy = testUser };

            await _context.Documents.AddAsync(newDoc);
            await _context.SaveChangesAsync();
            return Ok(newDoc.Id);
        }
        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UpdateDocDto updateDocDto)
        {
            Document document = await _context.Documents.FindAsync(updateDocDto.Id) ?? throw new Exception("Document Not Found");
            if (updateDocDto.CaretPositionDto == null) throw new Exception("Caret Position Not Given");

            document.Name = updateDocDto.Name;
            document.Content = updateDocDto.Content;
            document.LastEdit = DateTime.UtcNow;

            string? userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null) return BadRequest();

            DocUser? user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null) return BadRequest();

            CaretPositionDto caretPositionDto = new() { UserName = user.UserName??userEmail, CaretPosition = updateDocDto.CaretPositionDto.CaretPosition };

            await _context.SaveChangesAsync();
            await _docHubContext.Clients.All.SendAsync("UpdateDoc", document, caretPositionDto);
            return Ok();
        }
        [HttpPut("updateTitle")]
        public async Task<IActionResult> UpdateTitle([FromBody] UpdateDocTitleDto updateDocDto)
        {
            Document document = await _context.Documents.FindAsync(updateDocDto.Id) ?? throw new Exception("Document Not Found");
            
            document.Name = updateDocDto.Name;
            document.LastEdit = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}