const speech = require('@google-cloud/speech');
const fs = require('fs');

async  function main() {
    const client = new speech.SpeechClient();
    const filename = './practice/Welcome.wav';

    const file = fs.readFileSync(filename);
    const audioBytes = file.toString('base64');

    const audio = {
        content: audioBytes
    };

    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US'
    };

    const request = {
        audio: audio,
        config: config
    };


    const [operation] = await client.longRunningRecognize(request);
    const [response] = await operation.promise();
    const transcription = response.results.map(result =>
        result.alternatives[0].transcript).join('\n');
        console.log(`Transcription: ${transcription}`);
}

main().catch(console.error);