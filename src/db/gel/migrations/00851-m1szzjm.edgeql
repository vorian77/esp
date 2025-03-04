CREATE MIGRATION m1szzjm3ck4szyf6gxrevbhqyljuh36yaeydlbtas2gvrfvsa3whnq
    ONTO m1g4zz3fc262bojz3e3fpjytveqse4s6pa7sxeuzfzmiz4bciowo5q
{
  ALTER TYPE default::SysPerson RENAME TO default::SysPersonOld;
};
