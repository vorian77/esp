CREATE MIGRATION m1us6oqcybm6iarcv7gehie3j5ssc4gpgbno7tg6z7d5y3fhxjedgq
    ONTO m1i2wjp2fiwgef2eskcel6j4bxltxfmhpodlv7cbxyvt5bjnkneduq
{
  ALTER TYPE sys_user::SysUser {
      ALTER CONSTRAINT std::exclusive ON (.name) {
          DROP OWNED;
      };
  };
};
