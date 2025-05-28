CREATE MIGRATION m1bkliqp223ydtvbw5656gg2egebanvi2tcghgex63vjgugypfqt6q
    ONTO m1aym4meunkamwcfgnjhdb3edhyqxheyftq4wtg2g2xxovhfdupglq
{
  ALTER TYPE sys_user::SysUserActionShow {
      CREATE PROPERTY expr: std::str;
      CREATE PROPERTY exprWith: std::str;
  };
};
