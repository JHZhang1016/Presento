using System.ComponentModel;

namespace Application.Core
{
    public static class TEMP_PrintObject
    {
        public static void PrintObject(object obj)
        {
            foreach(PropertyDescriptor descriptor in TypeDescriptor.GetProperties(obj))
            {
                string name = descriptor.Name;
                object value = descriptor.GetValue(obj)?.ToString() ?? "null";
                Console.WriteLine("{0}={1}", name, value);
            }
        } 
    }
}