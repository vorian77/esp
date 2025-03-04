CREATE MIGRATION m1lmnqsvh43zesbsnhyg5ugt5iricfxpqgdm5emjbazrh74imlbipq
    ONTO m1t7mnsiszzxs4b6ctt3sdifbgwbttfmh4zppmxsg5lc2blw45efza
{
                  ALTER TYPE sys_rep::SysRep {
      CREATE MULTI LINK analytics: sys_rep::SysRepUserAnalytic;
  };
};
