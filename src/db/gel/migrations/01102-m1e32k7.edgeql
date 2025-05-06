CREATE MIGRATION m1e32k7g6uevgynlr7xouhdex22nxloe3nkjfs5hfixbyxojhuwglq
    ONTO m1oexpbuvc42nlbzkexx2tyt5yb66nki42ggxm6ifhkf7unuiqv4la
{
  CREATE TYPE sys_core::SysObjDb EXTENDING sys_core::SysObj {
      CREATE PROPERTY exprFilter: std::str;
      CREATE PROPERTY exprSort: std::str;
      CREATE PROPERTY exprWith: std::str;
  };
};
