CREATE MIGRATION m1gdl4mngipffm2da5fnddbeht5qkseri4dcyyb5punhzpznxnetna
    ONTO m17smr5hpbhid7yleltgnw46pqf6r7rlmikjnbiy2u5hlhdfzxhgqq
{
  ALTER TYPE sys_core::SysCodeAction {
      ALTER CONSTRAINT std::exclusive ON ((.owner, .codeType, .name)) {
          SET OWNED;
      };
  };
};
