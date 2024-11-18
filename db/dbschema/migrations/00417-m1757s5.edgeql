CREATE MIGRATION m1757s5sogbhkcxc375lpmcwsttpkqmqfmiwqnohqyrj33cbs7fh7q
    ONTO m1f7y4j2yp7s7ug2ehnn6ya56lf3f7shqwxihvkr7qv6nnejjwh3aq
{
  ALTER TYPE sys_rep::SysRepEl {
      CREATE PROPERTY indexSort: default::nonNegative;
  };
};
