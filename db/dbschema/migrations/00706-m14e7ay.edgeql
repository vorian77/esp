CREATE MIGRATION m14e7ayp5uxk2a2nad75enqj24miunkqdl7mmii2oldoq574ksc26a
    ONTO m12q2psv5zgbfeilqntbamrypbvdqwmhwhrwvn54ygxi5aqehkcpea
{
  ALTER TYPE app_cm::CmCsfMsg {
      ALTER LINK codeStatus {
          SET default := (SELECT
              std::assert_single(sys_core::SysCode FILTER
                  ((.codeType.name = 'ct_cm_msg_status') AND (.name = 'Sent'))
              )
          );
      };
  };
};
