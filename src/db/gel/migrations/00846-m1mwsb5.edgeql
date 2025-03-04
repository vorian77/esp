CREATE MIGRATION m1mwsb5jkk56u6rpni4xgfpz2gzbivawskizfa3dx75dpqgc3xk6gq
    ONTO m1mqptm4trilk4jrv6qgt6ttbil4zg2esmr7wnhzpifzez5qtkugqa
{
      CREATE TYPE sys_core::SysObjEnt EXTENDING sys_core::SysObj {
      ALTER LINK codeState {
          SET OWNED;
          SET TYPE sys_core::SysCode;
      };
      ALTER LINK contacts {
          SET MULTI;
          ON TARGET DELETE ALLOW;
          SET OWNED;
          SET TYPE default::SysPerson;
      };
      ALTER PROPERTY addr1 {
          SET OWNED;
          SET TYPE std::str;
      };
      ALTER PROPERTY addr2 {
          SET OWNED;
          SET TYPE std::str;
      };
      ALTER PROPERTY city {
          SET OWNED;
          SET TYPE std::str;
      };
      ALTER PROPERTY email {
          SET OWNED;
          SET TYPE std::str;
      };
      ALTER PROPERTY website {
          SET OWNED;
          SET TYPE std::str;
      };
      ALTER PROPERTY zip {
          SET OWNED;
          SET TYPE std::str;
      };
  };
};
