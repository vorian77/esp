CREATE MIGRATION m14o5nguz3rb4caogo7syzlyjj3yha4rddma5iijauks2x2ydnug3q
    ONTO m1us6oqcybm6iarcv7gehie3j5ssc4gpgbno7tg6z7d5y3fhxjedgq
{
  DROP FUNCTION sys_rep::getAnalytic(name: std::str);
  ALTER TYPE sys_rep::SysAnalytic {
      DROP CONSTRAINT std::exclusive ON (.name);
  };
  ALTER TYPE sys_rep::SysRep {
      ALTER CONSTRAINT std::exclusive ON (.name) {
          DROP OWNED;
      };
  };
  ALTER TYPE sys_user::SysUserAction {
      ALTER CONSTRAINT std::exclusive ON (.name) {
          DROP OWNED;
      };
  };
};
