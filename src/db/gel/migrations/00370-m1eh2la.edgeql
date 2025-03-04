CREATE MIGRATION m1eh2latjm2sywkx6lf4irqidbcaol6ljis7k4ibtqtqii6hkvs2ua
    ONTO m1mlurfyq7f5mfz3czcwjfz6begsi5zz54l22pd5zlvjzjoditvnvq
{
                  ALTER TYPE sys_core::SysDataObjFieldEmbedList {
      DROP LINK codeEditType;
  };
};
