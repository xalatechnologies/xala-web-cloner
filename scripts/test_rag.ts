import { findRelevantDocuments, formatDocumentsAsContext } from '../src/utils/retrieval';

async function testRAG() {
  // Test query
  const query = "What experience does Xala have with SharePoint and Microsoft 365?";
  
  console.log('Query:', query);
  console.log('\nSearching for relevant documents...');
  
  const documents = await findRelevantDocuments(query, 0.7, 3);
  
  console.log('\nFound', documents.length, 'relevant documents\n');
  
  const formattedContext = formatDocumentsAsContext(documents);
  console.log('Retrieved Context:');
  console.log(formattedContext);
}

// Run the test
console.log('Testing RAG System...\n');
testRAG()
  .then(() => console.log('\nTest completed'))
  .catch(error => console.error('Error:', error));
