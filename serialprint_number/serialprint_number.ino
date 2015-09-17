
void setup() {
  // put your setup code here, to run once:
  analogReference(EXTERNAL);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  
  for(int i = 0; i < 50; i++){
    //Serial.print(i);
    //Serial.println(",");
    
    char buffer[16];
    sprintf(buffer,"%d",i);
    Serial.print(buffer);
    Serial.print(",");
//    if(i == 24 || i == 49){
//      Serial.print("-");
//    }
    delay(500);
  }
  delay(5000);

}
