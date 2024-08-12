"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const NewQuizGameForm = () => {
  const [game, setGame] = useState({
    name: "",
    description: "",
    tutorial: "",
    image: "",
    type: "quiz",
    allowItemExchange: false,
    brandId: "",
    questions: [
      {
        text: "",
        options: [
          { text: "", isAnswer: false },
          { text: "", isAnswer: false },
          { text: "", isAnswer: false },
          { text: "", isAnswer: false },
        ],
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGame({ ...game, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setGame({ ...game, allowItemExchange: e.target.checked });
  };

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...game.questions];
    newQuestions[index].text = e.target.value;
    setGame({ ...game, questions: newQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const newQuestions = [...game.questions];
    newQuestions[questionIndex].options[optionIndex].text = e.target.value;
    setGame({ ...game, questions: newQuestions });
  };

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const newQuestions = [...game.questions];
    newQuestions[questionIndex].options = newQuestions[
      questionIndex
    ].options.map((option, index) => ({
      ...option,
      isAnswer: index === optionIndex,
    }));
    setGame({ ...game, questions: newQuestions });
  };

  const addQuestion = () => {
    setGame({
      ...game,
      questions: [
        ...game.questions,
        {
          text: "",
          options: [
            { text: "", isAnswer: false },
            { text: "", isAnswer: false },
            { text: "", isAnswer: false },
            { text: "", isAnswer: false },
          ],
        },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the game data to your backend
    console.log(game);
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/main">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/games">All Games</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/games/quiz">Quiz</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create new game</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>Create New Quiz Game</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={game.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={game.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="tutorial">Tutorial</Label>
              <Input
                id="tutorial"
                name="tutorial"
                value={game.tutorial}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={game.image}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="brandId">Brand ID</Label>
              <Input
                id="brandId"
                name="brandId"
                value={game.brandId}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowItemExchange"
                checked={game.allowItemExchange}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="allowItemExchange">Allow Item Exchange</Label>
            </div>

            {game.questions.map((question, qIndex) => (
              <Card key={qIndex} className="mt-4 p-4">
                <Label>Question {qIndex + 1}</Label>
                <Input
                  value={question.text}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  placeholder="Enter question"
                  className="mt-2"
                />
                {question.options.map((option, oIndex) => (
                  <div
                    key={oIndex}
                    className="mt-2 flex items-center space-x-2"
                  >
                    <Input
                      value={option.text}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      placeholder={`Option ${oIndex + 1}`}
                    />
                    <Checkbox
                      checked={option.isAnswer}
                      onCheckedChange={() => handleAnswerChange(qIndex, oIndex)}
                    />
                    <Label>Correct</Label>
                  </div>
                ))}
              </Card>
            ))}

            <Button type="button" onClick={addQuestion} variant="outline">
              Add Question
            </Button>

            <Button type="submit">Create Game</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
