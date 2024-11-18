CREATE MIGRATION m15qkkyozq376dgck5dqobikvquqjcaqc5td2ql74ztktjz7oipadq
    ONTO m1p5x54rnvf3o2meajm2grd6dd3z5kzla65zbcwzcaxjalxsdt3fnq
{
  ALTER TYPE sys_core::SysOrg {
      DROP EXTENDING sys_core::SysEnt;
      EXTENDING sys_core::ObjRoot,
      sys_user::Mgmt LAST;
  };
};
