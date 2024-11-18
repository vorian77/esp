CREATE MIGRATION m1kd2uys53odkpo2wxc5mahnp5zt7kmvqphba5np5pugggjweo2iyq
    ONTO m1rl6j2gwihfdgdx7qzelbope4kc3npbqz5hjjdj7c7bbik32pfyaa
{
                  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY indexTable {
          SET TYPE default::nonNegative USING (<default::nonNegative>.indexTable);
      };
  };
};
