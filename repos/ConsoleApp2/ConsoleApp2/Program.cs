using System;

namespace ConsoleApp2
{
    class Program
    {
        static void change(ref int x)
        {
            x += 5;
        }
        static void Main(string[] args)
        {
            int x = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine(x);

            change(ref x);

            while (x > 0)
            {
                Console.WriteLine(x);
                --x;
            }
        }
    }
}
