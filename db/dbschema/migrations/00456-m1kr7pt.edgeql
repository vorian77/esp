CREATE MIGRATION m1kr7pthjmknadaqcmaep5jba52kxl6ilmfvowtvtb5g644u4iav3a
    ONTO m1j4lxjglfwetvu35sm37u4c6mj5duxhwnr6vvin3pcre2gr2b7puq
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK listEditDataMapItems;
  };
  DROP TYPE sys_core::SysDataObjListEditDataMapItem;
};
