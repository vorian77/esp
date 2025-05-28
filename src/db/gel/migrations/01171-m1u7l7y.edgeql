CREATE MIGRATION m1u7l7yc3lfrndd2n63lomrmzz53eho3etrdwku2dnctxcdvpfzkra
    ONTO m1zj3ulfp3xj3ky3njnq56kq44vdo2jgue67ysbh77khhs2ehw6mvq
{
  ALTER TYPE sys_core::SysDataObjColumnLink {
      DROP PROPERTY exprDisplay;
  };
};
