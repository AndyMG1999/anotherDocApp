using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.AccountDtos
{
    public class UserInfoDto
    {
        public string? UserId { get; set; } = "";
        public string? UserName { get; set; } = "";
        public string? Email { get; set; } = "";
        public string? PhoneNumber { get; set; } = "";
        public byte[]? ProfileImage { get; set; }
        public bool EmailConfirmed { get; set; }
    }
}