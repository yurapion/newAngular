using System;
using System.Collections.Generic;

namespace MuskeetApp.API.Model
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string City { get; set; }    
        public string PostalCode { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
    }
}