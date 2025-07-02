CREATE MIGRATION m1rvo2dgn3npbodxyssl42d2ybsmqi2ke4ipjdhkk4g4efaafq2iyq
    ONTO m14gtznlpx5ikvav4ss2n52dx524swhvhprn2krq6t6lpe7hxqxyga
{
  ALTER TYPE sys_core::SysOrg {
      DROP LINK users;
  };
};
