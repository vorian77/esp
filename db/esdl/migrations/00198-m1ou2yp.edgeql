CREATE MIGRATION m1ou2yp5aezw6dmakerffcxedcb6wa376thtpoaralbloezhwk6jjq
    ONTO m1fteu7r6bizxrqd6qninm3oifsc6znic3hqzjwsoevcf34rq4dtdq
{
                  ALTER TYPE sys_core::SysDataObjAction {
      ALTER LINK codeActionConfirmType {
          RENAME TO codeActionConfirmTrigger;
      };
  };
};
