CREATE MIGRATION m1bf4wcr2dq4fbvmonmckk6oxparqy4lgrnjui4m3kyvctiehe3kfq
    ONTO m1o2toe6mmewd4hpmsaaffmskaxkedghbc7tckkwazdq32hxuq37pq
{
  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE PROPERTY employerContactPhone: std::str;
  };
};
