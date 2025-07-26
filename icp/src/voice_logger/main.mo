import Time "mo:base/Time";

actor {
  type VoiceLog = {
    id: Text;
    isFake: Bool;
    confidence: Float;
    timestamp: Int;
  };

  var logs : [VoiceLog] = [];

  public func logVoiceCheck(id: Text, isFake: Bool, confidence: Float) : async Text {
    let now = Time.now();
    let entry : VoiceLog = {
      id = id;
      isFake = isFake;
      confidence = confidence;
      timestamp = now;
    };
    logs := Array.append(logs, [entry]);
    return "Logged successfully.";
  };

  public query func getLogs() : async [VoiceLog] {
    return logs;
  };
}
