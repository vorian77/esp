CREATE MIGRATION m1c4v6hzy6rk6vjxcfmp5275d2eue4s3zgsc6okzxxrzxthpedxcjq
    ONTO m14r6ymtnkkqqlm46j45svtb4tkazzeevyfzciulj5y2wpryqxehwq
{
              ALTER TYPE sys_core::SysDataObj {
      DROP LINK listEditDataMapItems;
  };
  DROP TYPE sys_core::SysDataObjListEditDataMapItem;
};
