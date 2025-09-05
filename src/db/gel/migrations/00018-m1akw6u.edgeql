CREATE MIGRATION m1akw6umyngboio5pt3fntfezmjzpjl4vei6llaz47fxcujksh4r7q
    ONTO m1jthkvino32xehu4ztztmrxy75khlwwxpjvzom7xd7u4nf2hzeama
{
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      CREATE PROPERTY valueTargetExpr: std::str;
  };
};
