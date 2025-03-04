CREATE MIGRATION m1f7y4j2yp7s7ug2ehnn6ya56lf3f7shqwxihvkr7qv6nnejjwh3aq
    ONTO m12aqhqf5knjlsolasnavh4ds5jltyhjm3egnkfc46kxrpvjskddta
{
              ALTER TYPE sys_rep::SysRepUserEl {
      ALTER LINK element {
          ON TARGET DELETE ALLOW;
      };
  };
};
