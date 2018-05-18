## This is a script to demonstrate
# blast taskobject implementation




#blastCmd="blastpgp -i $inputF -m 7 -d $dbPath -h $eValue -j $nbIter -b $maxSeq"

#$blastCmd > blastOutput.xml
value=$(blastXMLtoJSON.py $inputX)
echo "{\"data\" : $value }"
