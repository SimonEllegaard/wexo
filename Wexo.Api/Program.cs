using Wexo.Data;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
var repo = new Repository();

app.MapGet("/", async () => await repo.GetData());

app.Run();
