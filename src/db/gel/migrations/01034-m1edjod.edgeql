CREATE MIGRATION m1edjodfnesxhuakiwufsrrixefksj7g5zinfaks2scuy4apgbxobq
    ONTO m14ns4gfvqkswnbh5qt4beb6j5b4g5mg3h6hvnnyzlzqiunlvsrvja
{
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      CREATE LINK codeLinkValueType: sys_core::SysCode;
      CREATE PROPERTY retrieveParmKey: std::str;
  };
};
