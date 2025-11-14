using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.DocDtos
{
    public class CreateDocDto
    {
        public string Name { get; set; } = "";
        public string Content { get; set; } = "";
    }
}