namespace Wexo.Data;

public interface IRepository
{
    public Task<string> GetData();

}