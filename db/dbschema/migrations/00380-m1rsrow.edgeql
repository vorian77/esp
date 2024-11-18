CREATE MIGRATION m1rsrowagrd4ggna65x2aadhf6acfah7g6xhxb6zztqrpwbhkz4a7q
    ONTO m1yo3vsdhlbs4l3pao2hfiaeglatd5b5wgx32xxkzk3duatju4emxa
{
  ALTER TYPE sys_rep::SysAnalytic {
      ALTER LINK parms {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
