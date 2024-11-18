CREATE MIGRATION m1ff37m2wxlle65cnosps6clmnqbxhk6gdpbiyochueu2o4cqnofyq
    ONTO m1zx7m4otl5wqwqhpl3wa6e53c6zc3jeinnywnshjmtenm2b3joyza
{
      ALTER TYPE sys_rep::SysRep {
      DROP LINK analytics;
  };
  ALTER TYPE sys_rep::SysRepAnalytic {
      DROP LINK parmDefnCodeType;
      DROP PROPERTY description;
      DROP PROPERTY expr;
      DROP PROPERTY name;
      DROP PROPERTY parmDefnNbr1;
      DROP PROPERTY parmDefnNbr2;
  };
  ALTER TYPE sys_rep::SysRepUserAnalytic {
      DROP LINK analytic;
      DROP LINK parmCode1;
      DROP PROPERTY parmNbr1;
      DROP PROPERTY parmNbr2;
  };
  DROP TYPE sys_rep::SysRepAnalytic;
  ALTER TYPE sys_rep::SysRepUser {
      DROP LINK analytics;
  };
  DROP TYPE sys_rep::SysRepUserAnalytic;
};
