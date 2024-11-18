CREATE MIGRATION m1xajx3fwihb7mwvy6ezrdch74cv2g7igo7yw3yevhjebobk4ouvgq
    ONTO m1xhodcuvrtldlgcmzrh527prhx4flh4pqjixt4zbnzhbrzvmqowoq
{
  ALTER TYPE sys_rep::SysRepUserParm {
      CREATE REQUIRED PROPERTY orderDisplay: default::nonNegative {
          SET REQUIRED USING (<default::nonNegative>{});
      };
  };
};
