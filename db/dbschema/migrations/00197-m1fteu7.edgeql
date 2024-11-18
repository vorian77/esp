CREATE MIGRATION m1fteu7r6bizxrqd6qninm3oifsc6znic3hqzjwsoevcf34rq4dtdq
    ONTO m1qvpj4jtewdr7yahnjsvgtpmpju6lcnfynuvkl6u6a4mvigsg2moq
{
  ALTER TYPE sys_core::SysDataObjAction {
      ALTER LINK codeActionsEnable {
          RENAME TO codeActionEnable;
      };
  };
};
