CREATE MIGRATION m1xnd43q7pa7euxzb5coo46xzcfgyxxibzcj72qifep2swk63u26qq
    ONTO m1lh2zy2pfyhuydkugq5ivzd2ntf7hri5q4dtr6gmjk3k425k5zhbq
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER LINK data {
          RENAME TO nodeData;
      };
  };
  ALTER TYPE sys_user::SysUserPref {
      ALTER PROPERTY data {
          RENAME TO prefData;
      };
  };
};
