CREATE MIGRATION m1q26u7o2ftmuojmlnwealwevc7lsc3qkpwsqo4nyoijeztmoip5kq
    ONTO m1btvjoviqyubkgk3577r5u4w3fnthetf6lkapxifnogtxztswpvnq
{
  ALTER TYPE sys_core::SysAttrAccess {
      CREATE MULTI LINK attrs: sys_core::SysAttr;
  };
};
