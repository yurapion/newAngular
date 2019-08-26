using System;
using System.Collections.Generic;

namespace MuskeetApp.API.Model
{
    public class CarWorkShop
    {
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        // public string TradeMark { get; set; }
        public ICollection<TradeMark> TradeMarks { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
    }
    

}