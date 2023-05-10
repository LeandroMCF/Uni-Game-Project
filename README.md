# Uni-Game-Project
Projeto Uninove segundo semestre

(Atualização em 09/05/2023)
Está é uma API simples de cadastro e login de usuário. 

Estou usando .NET7 Web API com c#, sem essa versão do .NET é impossivel rodar essa API.

Essa api está integrada a um banco de dados SQL Server, é possivel ter acesso a string de conexão do banco no arquivo "UniContext" (Context/UniContex.cs). Nesse arquivo você terá acesso a string de conexão seguida das configurações da tabela de User no banco de dado:

```
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=DESKTOP-MELCHIL;Database=Project_Uni;Trusted_Connection=True;TrustServerCertificate=True;");

    public DbSet<UserDomain> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
         modelBuilder.Entity<UserDomain>()
            .HasKey(u => u.UserId);

        modelBuilder.Entity<UserDomain>()
            .Property(u => u.Name)
            .HasMaxLength(50)
            .IsRequired();

        modelBuilder.Entity<UserDomain>()
            .Property(u => u.Email)
            .HasMaxLength(50)
            .IsRequired();

        modelBuilder.Entity<UserDomain>()
            .Property(u => u.Password)
            .HasMaxLength(50)
            .IsRequired();

        modelBuilder.Entity<UserDomain>()
            .Property(u => u.CreationTime)
            .IsRequired();

        modelBuilder.Entity<UserDomain>()
            .Property(u => u.Status)
            .IsRequired();

        modelBuilder.Entity<UserDomain>()
            .Property(u => u.Permission)
            .IsRequired();

        OnModelCreatingPartial(modelBuilder);
    }

```

Essa string de conexão ("Server=DESKTOP-MELCHIL;Database=Project_Uni;Trusted_Connection=True;TrustServerCertificate=True;") Efetua a conexão no meu servidor local "DESKTOP-MELCHIL" no banco de dados "Project_Uni", caso você queira replicar esse banco de dados, primeiro baixe e instale o SSMS e logo em seguinda o Sql Server e faça as configurações do seu servidor local. (Caso precise de ajuda pode me chamar no pv que eu posso te auxiliar).

Para o cadastro do usuário não existe muito segredo, já para o login é gerado um Token que serve para a validação segura desse usuário na plataforma Web.

Esses são os updates ate agora, qualquer coisa é só entrar em contato comigo!