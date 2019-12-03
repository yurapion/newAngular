using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using MuskeetApp.API.Model;

namespace MuskeetApp.API.Helpers
{
    public static class Extensions 
    {
       //Create an extension method to add headers to our error response
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers","Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
    }
}