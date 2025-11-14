using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class DocUser : IdentityUser
    {
        public byte[]? ProfileImage { get; set; }
        [JsonIgnore]
        public List<Document> UserDocuments { get; set; } = [];
    }
}