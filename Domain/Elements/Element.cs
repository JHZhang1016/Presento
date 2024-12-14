namespace Domain
{
    public abstract class Element
    {
        public Guid Id { get; set; }
        public int PositionX { get; set; }
        public int PositionY { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public int ZIndex { get; set; }
        public ElementsType Type { get; set;}
    } 
}