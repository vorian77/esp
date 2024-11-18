CREATE MIGRATION m1tl7pj7sfvxh46yhpivzvakr2rt5mwoioyx4kqfbaxrvbmlryxmpa
    ONTO m1bv7rqb36ckm7icxklzrm4hcmsneirwepdcsofaz3kgh7b3iktgva
{
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY isSelect;
  };
};
