CREATE MIGRATION m1zj3ulfp3xj3ky3njnq56kq44vdo2jgue67ysbh77khhs2ehw6mvq
    ONTO m1jusqwcg4dzzq7o7v2ioc4xu47cwkdgljmp7aicxu74imrgly6cha
{
  ALTER TYPE sys_core::SysDataObjColumnLink {
      ALTER LINK column {
          RESET OPTIONALITY;
      };
      CREATE PROPERTY exprDisplay: std::str;
  };
};
