CREATE MIGRATION m1qdvuz6aexhktmmqv5rfkdo3n5obpmi4joq6s2hlgabgozx4g24za
    ONTO m1f7en6rjsdyrapdd4tmgk57znt2egh2lnsjdgidlvxhae3adbcjyq
{
              ALTER TYPE sys_core::SysDataObj {
      DROP LINK listEditDataMapItems;
  };
  DROP TYPE sys_core::SysDataObjListEditDataMapItem;
};
