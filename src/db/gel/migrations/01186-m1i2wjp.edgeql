CREATE MIGRATION m1i2wjp2fiwgef2eskcel6j4bxltxfmhpodlv7cbxyvt5bjnkneduq
    ONTO m1vgnptn4iyegnf7b7yvhmothfjiyazhe54nlqhv4ww5dq6wnwvjxq
{
  ALTER TYPE sys_user::SysUser {
      ALTER CONSTRAINT std::exclusive ON (.name) {
          SET OWNED;
      };
  };
  ALTER TYPE sys_user::SysUser {
      DROP PROPERTY userName;
  };
};
