CREATE MIGRATION m13rjldijkez43d2zryq52k7yovsao35yy267nnrljj4tp7deiqyrq
    ONTO m1mswvrcy44px3gnpd5dg5uv7rg7jlosumrno3afpf4iknawpjbbxa
{
              ALTER TYPE sys_rep::SysRepUser {
      ALTER LINK report {
          ON SOURCE DELETE DELETE TARGET;
          RESET ON TARGET DELETE;
      };
  };
};
