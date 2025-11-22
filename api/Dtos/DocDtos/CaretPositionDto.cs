using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.DocDtos
{
    public class CaretPositionDto
    {
        public string UserName { get; set; } = "";
        public int CaretPosition { get; set; }
    }
}