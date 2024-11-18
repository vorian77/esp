CREATE MIGRATION m17iclwnaqfm2myt6bvrfjxcpm3qexcsepnbdl6yr4cmwmhcspj4za
    ONTO m1ktklydmwo4cyuyn6nlrmasbtydh7byfvibrtaczwyt7zz53vutaa
{
      ALTER TYPE sys_rep::SysRepAnalytic {
      ALTER PROPERTY parmDefnNbr1 {
          SET TYPE std::str USING (<std::str>.parmDefnNbr1);
      };
      ALTER PROPERTY parmDefnNbr2 {
          SET TYPE std::str USING (<std::str>.parmDefnNbr2);
      };
  };
};
